import pdfplumber
import io


def extract_pdf_text(file_bytes):

    text = ""

    try:

        with pdfplumber.open(
            io.BytesIO(file_bytes)
        ) as pdf:

            for page in pdf.pages:

                page_text = page.extract_text()

                if page_text:

                    text += page_text + "\n"

    except Exception as e:

        print(e)

    return text