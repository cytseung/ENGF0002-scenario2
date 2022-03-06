from dataclasses import fields
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from .models import ImportedMatrixQuestion, Type

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

class ImportedMatrixQuestionSerializer(serializers.ModelSerializer):
    type = TypeSerializer(many=False, read_only=True)
    class Meta:
        model = ImportedMatrixQuestion
        fields = ['id', 'created_on', 'matrix1', 'matrix2', 'answer', 'type', ]


