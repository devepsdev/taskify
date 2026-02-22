from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("id", "title", "description", "done", "created_at")
        # fields = "__all__"
        read_only_fields = ("id", "created_at")
