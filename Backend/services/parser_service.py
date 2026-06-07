import re


def extract_email(text):

    pattern = r'[\w\.-]+@[\w\.-]+\.\w+'

    match = re.search(pattern, text)

    if match:
        return match.group()

    return ""


def extract_phone(text):

    pattern = r'(\+91[- ]?)?[6-9]\d{9}'

    match = re.search(pattern, text)

    if match:
        return match.group()

    return ""


def extract_linkedin(text):

    pattern = r'linkedin\.com/in/[A-Za-z0-9_-]+'

    match = re.search(pattern, text.lower())

    if match:
        return match.group()

    return ""


def extract_github(text):

    pattern = r'github\.com/[A-Za-z0-9_-]+'

    match = re.search(pattern, text.lower())

    if match:
        return match.group()

    return ""