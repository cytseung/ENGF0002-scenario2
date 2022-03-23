from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ImportedMatrixQuestion, Type
from .serializers import ImportedMatrixQuestionSerializer, TypeSerializer

class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

class ImportedMatrixQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = ImportedMatrixQuestionSerializer
    
    def get_queryset(self):
        if not self.request.query_params.get('num'):
            # simply return all questions in order if num parameter is not given
            return ImportedMatrixQuestion.objects.all()
        try:
            num = int(self.request.query_params['num'])
            return ImportedMatrixQuestion.objects.all().order_by('?')[:num]
        except ValueError:
            raise ValidationError("num must be a valid number")

    @action(detail=False)
    def total_number_of_questions(self, request):
        return Response({'totalNumber': ImportedMatrixQuestion.objects.count()})
    
class CheckAnswerView(APIView):
    def post(self, request, pk=None):
        q = get_object_or_404(ImportedMatrixQuestion, pk=pk)
        user_ans = request.data["answer"]
        if ''.join(c for c in user_ans if c.isdigit() or c in "[]," ) ==	''.join(c for c in q.answer if c.isdigit() or c in "[]," ):
            return Response({'isCorrect':True})
        return Response({'isCorrect':False})


class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser,]
    # save questions here
    def post(self, request, format=None):
        file = request.data['file']
        try:
            numQ = int(file.readline().decode().strip())
        except ValueError:
            raise ValidationError({"number of questions must be an integer"})
        else:
            count = 0
            for i in range(numQ):
                q_type = file.readline().decode().strip()
                if all(t.name != q_type for t in Type.objects.all()):
                    raise ValidationError({'importedCount': count, 'error':f'{q_type} type not defined'.format(q_type=q_type)})
                q_type_obj = Type.objects.get(name=q_type)
                try:
                    m1_m, m1_n =list(map(int, file.readline().decode().strip().split()))
                    m2_m, m2_n =list(map(int, file.readline().decode().strip().split()))
                    m1_values = list(map(int, file.readline().decode().strip().split()))
                    m2_values = list(map(int ,file.readline().decode().strip().split()))
                    if m1_m * m1_n != len(m1_values) or m2_m * m2_n != len(m2_values):
                        raise ValidationError({'importedCount': count, 'error':'Dimensions do not match with number of elements'})
                    m1 = []
                    m2 = []
                    for i in range(m1_m):
                        row = []
                        for j in range(m1_n):
                            row.append(m1_values[m1_n*i+j])
                        m1.append(row)
                    for i in range(m2_m):
                        row = []
                        for j in range(m2_n):
                            row.append(m2_values[m2_n*i+j])
                        m2.append(row)
                    ans_m, ans_n = list(map(int, file.readline().decode().strip().split()))
                    ans_values = list(map(int, file.readline().decode().strip().split()))
                    if ans_m * ans_n != len(ans_values):
                        raise ValidationError({'importedCount': count, 'error':'Dimensions do not match with number of elements'})
                    ans = []
                    for i in range(ans_m):
                        row = []
                        for j in range(ans_n):
                            row.append(ans_values[ans_n*i+j])
                        ans.append(row)
                    importedQ = ImportedMatrixQuestion(type=q_type_obj, matrix1=str(m1), matrix2=str(m2), answer=str(ans))
                    importedQ.save()
                    count += 1

                except ValueError:
                    raise ValidationError({'importedCount': count, 'error':'Dimensions must be integers'})
            if file.readline().decode() != "":
                raise ValidationError({'importedCount': count, 'error':f'You specifed only {numQ} but provided more than {numQ} question(s)'.format(count=count,numQ=numQ)})
            
        return Response({'importedCount': count, 'error':None})
