from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('types', views.TypeViewSet)
router.register('imported-matrix-questions', views.ImportedMatrixQuestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]