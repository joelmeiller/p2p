package ch.fhnw.p2p.utils;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.Locale;
import java.util.regex.Pattern;

public class Slug {

	private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
	private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

	/**
	 * return the slug of to a given input string of any kind including special chars.
	 * REMARK: Uniqueness is not guaranteed
	 * 
	 * @param input string (can contain special chars)
	 * @return slug of input string
	 */
	public static String makeSlug(String input) {
		String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
		String normalized = Normalizer.normalize(nowhitespace, Form.NFD);
		String slug = NONLATIN.matcher(normalized).replaceAll("");
		return slug.toLowerCase(Locale.ENGLISH);
	}
	
	/**
	 * return the slug of to an email address. 
	 * REMARK: Uniqueness is not guaranteed
	 * 
	 * @param email address
	 * @return slug of email address
	 */
	public static String makeSlugFromEmail(String email) {
		if (email == null || email.length() < 3 || email.indexOf("@") == -1) throw new IllegalArgumentException("Invalid email address");
		String input = email.length() > 0 && email.indexOf("@") > 0 ? email.split("@")[0] : "";
		
		input = input.replace(".", "-");
		return makeSlug(input);
	}
}
