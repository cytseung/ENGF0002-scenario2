from django.db import models


class Type(models.Model):
    name = models.CharField(max_length=40, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    
    def __str__(self):
        return f"{self.id} - {self.name}: {self.text}"

class ImportedMatrixQuestion(models.Model):
    type = models.ForeignKey(Type,on_delete=models.CASCADE,related_name="questions")
    created_on = models.DateTimeField(auto_now_add=True)
    matrix1 = models.CharField(max_length=200)
    matrix2 = models.CharField(max_length=200, null=True, blank=True)
    answer = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.id} - {self.type}: m1:{self.matrix1}, m2:{self.matrix2}, ans:{self.answer}"