package com.ione.landing.cmm.util;

import java.io.File;
import java.io.UnsupportedEncodingException;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class MailHandler {
	private JavaMailSender sender;
	private MimeMessage message;
	private MimeMessageHelper messageHelper;

	public MailHandler(JavaMailSender jSender) throws 
    MessagingException {
		this.sender = jSender;
    	message = jSender.createMimeMessage();
    	messageHelper = new MimeMessageHelper(message, true, "UTF-8");
    }

	public void setFrom(String email, String name) throws UnsupportedEncodingException, MessagingException {
		messageHelper.setFrom(email, name);
	}

	public void setTo(String email) throws MessagingException {
		messageHelper.setTo(email);
	}

	public void setSubject(String subject) throws MessagingException {
		messageHelper.setSubject(subject);
	}

	public void setText(String text) throws MessagingException {
		messageHelper.setText(text, true);
	}

	public void addInline(String contentId, Resource resource) throws MessagingException {
		messageHelper.addInline(contentId, resource);
	}

	public void addInline(String contentId, File file) throws MessagingException {
		messageHelper.addInline(contentId, file);
	}

	public void addInline(String contentId, DataSource source) throws MessagingException {
		messageHelper.addInline(contentId, source);
	}

	public boolean send() {
		boolean result = false;
		try {
			sender.send(message);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
