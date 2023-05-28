from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
# Create your views here.

@api_view(['GET'])#這個view只能get
def getRoutes(request):
    routes=[{
        'name':'apple',
        'date': 'March 11'}

    ]
    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getNote(request, pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note= Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)



@api_view(['PUT'])
def updateNote(request, pk):
    data=request.data
    note = Note.objects.get(id=pk)
    serializer=NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request, pk):
    note=Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')