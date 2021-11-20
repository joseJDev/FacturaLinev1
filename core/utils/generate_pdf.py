""" Funcion para generar PDF """

# from
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template

# PDF
from xhtml2pdf import pisa

def render_to_pdf(template_name, context_dict = {}):
    template = get_template(template_name)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode('UTF8')), result)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None