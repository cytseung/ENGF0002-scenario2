from django.shortcuts import render

from rest_framework import viewsets

from .models import ImportedMatrixQuestion, Type
from .serializers import ImportedMatrixQuestionSerializer, TypeSerializer

class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

class ImportedMatrixQuestionViewSet(viewsets.ModelViewSet):
    queryset = ImportedMatrixQuestion.objects.all()
    serializer_class = ImportedMatrixQuestionSerializer

