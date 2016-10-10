package ch.fhnw.p2p.utils;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.Locale;
import java.util.regex.Pattern;

public class Slug {

	private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
	private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

	public static String makeSlug(String input) {
		String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
		String normalized = Normalizer.normalize(nowhitespace, Form.NFD);
		String slug = NONLATIN.matcher(normalized).replaceAll("");
		return slug.toLowerCase(Locale.ENGLISH);
	}
	
	public static String makeSlugFromEmail(String email) {
		if (email == null || email.length() < 3 || email.indexOf("@") == -1) throw new IllegalArgumentException("Invalid email address");
		String input = email.length() > 0 && email.indexOf("@") > 0 ? email.split("@")[0] : "";
		
		input = input.replace(".", "-");
		return makeSlug(input);
	}
}
