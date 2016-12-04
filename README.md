# p2p

## Install

This section describes in detail how to install the web application and all
developer dependencies on a Ubuntu 14.04 computer.

### Prerequisites

Packages:

```bash
sudo apt-get update
sudo apt-get install git node npm curl mysql-server squid3
```

Manual downloads

- [Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB)
- [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven](http://maven.apache.org/download.cgi)
- [Tomact 7](https://tomcat.apache.org/download-70.cgi)

Install Java 8 (system wide)

```bash
(cd /opt && sudo mkdir Oracle_Java && cd Oracle_Java && sudo tar xzvf ~/Downloads/jdk-8u111-linux-x64.tar.gz)
sudo update-alternatives --install "/usr/bin/java" "java" "/opt/Oracle_Java/jdk1.8.0_111/bin/java" 1
sudo update-alternatives --install "/usr/bin/javac" "javac" "/opt/Oracle_Java/jdk1.8.0_111/bin/javac" 1
sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/opt/Oracle_Java/jdk1.8.0_111/bin/javaws" 1
sudo update-alternatives --install "/usr/bin/jar" "jar" "/opt/Oracle_Java/jdk1.8.0_111/bin/jar" 1
sudo update-alternatives --set "java" "/opt/Oracle_Java/jdk1.8.0_111/bin/java"
sudo update-alternatives --set "javac" "/opt/Oracle_Java/jdk1.8.0_111/bin/javac"
sudo update-alternatives --set "javaws" "/opt/Oracle_Java/jdk1.8.0_111/bin/javaws"
sudo update-alternatives --set "jar" "/opt/Oracle_Java/jdk1.8.0_111/bin/jar"
echo ‘JAVA_HOME=”/opt/Oracle_Java/jdk1.8.0_111”’ | sudo tee -a /etc/environment
```

Install  (system wide)

```bash

tar xzvf ~/Downloads/apache-tomcat-7.0.73.tar.gz
```

Install maven + tomcat (for user only)

```bash
tar xzvf Downloads/apache-tomcat-7.0.73.tar.gz
tar xzvf Downloads/apache-maven-3.3.9-bin.tar.gz
mkdir bin
ln -s ~/apache-maven-3.3.9/bin/mvn ~/bin/mvn
ln -s ~/apache-tomcat-7.0.73/bin/catalina.sh ~/bin/catalina.sh
. .profile
```

Install node / npm / react-scripts

```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs
sudo npm install -g npm
sudo npm install -g react-scripts
```

### Download repository

The following commands download the entire source code and use the default
settings for dev and prod configuration. This will work with the other commands
provided in this instructions, but you probably want to modify MySQL passwords
eventually...

```bash
git clone https://github.com/joelmeiller/p2p
cd p2p
cp src/main/resources/application-dev.properties.example src/main/resources/application-dev.properties
cp src/main/resources/application-prod.properties.example src/main/resources/application-prod.properties
```

### Create MySQL databases / users

(Replace `XXX` with your MySQL root password from step above.)

```bash
mysql -u root -pXXX < ./create_users.sql
```

## Run P2P (dev)

The project-specific dependencies are automatically installed when the
components are used for the first time. Especially for the frontend
dependencies this might take a while (if you're lucky and there are no new js
package conflicts :P). Run the following commands in the project root.

Backend (`http://localhost:8080/ip-p2p/api`)

```bash
mvn spring-boot:run
```

Frontend (`http://localhost:3000`)

```bash
npm start
```

You can log in as any of the predefined users -- see

- `vladimir.petkovic@fhnw.ch` : COACH
- `test.person1@students.fhnw.ch` : STUDENT FULLTIME
- `test.person3@students.fhnw.ch` : STUDENT BB
- `test.person5@students.fhnw.ch` : STUDENT PARTTIME

Those and more users are defined in:
[MemberDataLoader.java](https://github.com/joelmeiller/p2p/blob/master/src/main/java/ch/fhnw/p2p/fixtures/MemberDataLoader.java)
and
[CoachDataLoader.java](https://github.com/joelmeiller/p2p/blob/master/src/main/java/ch/fhnw/p2p/fixtures/CoachDataLoader.java)

## Run P2P (prod)

```bash
sudo apt-get install squid
```

Run the following command in the project root:

```bash
sed -i '/spring.profiles.active=dev/c\spring.profiles.active=prod src/main/resources/application.properties
npm run webpack
mvn package
cp target/web-app-0.0.1-SNAPSHOT.war ../apache-tomcat-7.0.73/webapps/ip-p2p.war
sed -i '/spring.profiles.active=prod/c\spring.profiles.active=dev' src/main/resources/application.properties
```

Run the following command in the home directory:

```bash
./apache-tomcat-7.0.73/bin/catalina.sh run
```

Access the webapp in `http://localhost:8080/ip-p2p`

The production backend reads the user email address from a proxy-provided http
header `mail`. This header is automaticall provided by the
[Shibboleth SWITCHaai](https://www.switch.ch/aai/about/shibboleth/)
and can be emulated on the local machine using the squid3 proxy:

```bash
echo include ~/p2p/squid.conf | sudo tee -a /etc/squid3/squid.conf
google-chrome-stable --proxy-server=localhost:3128 http://localhost:8080/ip-p2p/
```

The proxy can then be reloaded with `sudo squid3 -k reconfigure`

## Install developer environment

For backend development:

- Install [Eclipse Neon](https://www.eclipse.org/downloads/download.php?file=/oomph/epp/neon/R1/eclipse-inst-linux64.tar.gz)
- Eclipse: File/import : Existing Maven Projects
- Download [lombok](https://projectlombok.org/download.html)
- Install lombok : `java -jar ~/Downloads/lombok.jar install ~/eclipse/java-neon/eclipse/`
- Restart eclipse
- Project/Clean...
- Right-click project : Refresh
- Repeat above steps until errors disappear (no joke, sorry)
- Right-click ch.fhnw.p2p.WebApplication : Run As : Java Application

For frontend development:

- Download [atom](https://atom.io/)
- Edit/preferences : Install : `react`, `linter-eslint`
- [Chrome react developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Chrome redux developer tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
