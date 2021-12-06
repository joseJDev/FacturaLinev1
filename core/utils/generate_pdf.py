""" Funcion para generar PDF """

# from
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template, render_to_string

# PDF
from xhtml2pdf import pisa
from docraptor import DocApi, rest

def render_to_pdf(template_name, context_dict = {}):
    template = get_template(template_name)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode('UTF8')), result)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None


def render_pdf_docraptor(template_name, filename, context_dict = {}):
    template_string = render_to_string(template_name, context_dict)

    doc_api = DocApi()
    doc_api.api_client.configuration.username = 'V9xMwp6ptiGl5tf1fm-9'

    try:
        response = doc_api.create_doc({
            "test": True,
            "document_content": template_string,
            "name": filename,
            "document_type": "pdf"
        })
        
        return response

    except rest.ApiException as error:
        print(error.status)
        print(error.reason)
        print(error.body)