# Django
from django.urls import path

# Views
from .views import (
    HomeView, ClientListTemplate,
    ClientListView, ClientCreateView,
    ClientUpdateView, ClientDeleteView,
    ProductListTemplate, ProductListView,
    ProductCreateView, ProductUpdateView,
    ProductDeleteView, FactureView,
    GetInfoClientView, GenerateQuotes,
    GeneratePDF, ReportClientTemplate,
    GetReportView, DetailFactureView,
    FinancialBoxDetailView
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    
    # Clientes
    path('client/', ClientListTemplate.as_view(), name='list_client'),
    path('client-list/', ClientListView.as_view(), name='list_client_ajax'),
    path('client-create/', ClientCreateView.as_view(), name='create_client'),
    path('client-update/<int:pk>', ClientUpdateView.as_view(), name='update_client'),
    path('client-delete/<int:pk>', ClientDeleteView.as_view(), name='delete_client'),

    # Productos
    path('product/', ProductListTemplate.as_view(), name='list_product'),
    path('product-list/', ProductListView.as_view(), name='list_product_ajax'),
    path('product-create/', ProductCreateView.as_view(), name='create_product'),
    path('product-edit/<int:pk>', ProductUpdateView.as_view(), name='edit_product'),
    path('product-delete/<int:pk>', ProductDeleteView.as_view(), name='delete_product'),

    # Factura
    path('facture/', FactureView.as_view(), name='facture'),
    path('facture-get-client/', GetInfoClientView.as_view(), name='facture_get_client'),
    path('facture-gen-quotes/', GenerateQuotes.as_view(), name='facture_gen_quotes'),
    path('facture-gen-pdf/', GeneratePDF.as_view(), name='facture_gen_pdf'),
    path('detail-facture/<int:pk>', DetailFactureView.as_view(), name='detail_facture'),
     
    
    # Reportes 
    path('report/', ReportClientTemplate.as_view(), name='report'),
    path('get-report/', GetReportView.as_view(), name='get_report'),

    # Caja
    path('financial-box/<int:pk>', FinancialBoxDetailView.as_view(), name='financial_box'),
]
