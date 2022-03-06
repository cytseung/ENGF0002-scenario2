from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ImportedMatrixQuestion, Type
from .serializers import ImportedMatrixQuestionSerializer, TypeSerializer

class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

class ImportedMatrixQuestionViewSet(viewsets.ModelViewSet):
    queryset = ImportedMatrixQuestion.objects.all()
    serializer_class = ImportedMatrixQuestionSerializer

    
class CheckAnswerView(APIView):
    def post(self, request, pk=None):
        q = get_object_or_404(ImportedMatrixQuestion, pk=pk)
        user_ans = request.data["answer"]
        if user_ans == q.answer:
            return Response({'isCorrect':True})
        return Response({'isCorrect':False})


class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser,]
    # save questions here
    def post(self, request, format=None):
        for line in request.data['file']:
            s = line.decode()
            print(s)
        return Response(request.data['file'])