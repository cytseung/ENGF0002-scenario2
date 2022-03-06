from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('types', views.TypeViewSet)
router.register('imported-matrix-questions', views.ImportedMatrixQuestionViewSet)

urlpatterns = [
    path('imported-matrix-questions/<pk>/', views.CheckAnswerView.as_view(), name='check_answer'),
    path('', include(router.urls)),
    path('file-upload/', views.FileUploadView.as_view(),name="file_upload"),
   
]