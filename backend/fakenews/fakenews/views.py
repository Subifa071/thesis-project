import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .detect_fake_news import detect_fake_news


@csrf_exempt
def detect(request):
    if (request.method !="POST"):

      return JsonResponse({"message":"Only POST requests are supported"})

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    news = body.get('news')

    is_fake = detect_fake_news(news)

    return JsonResponse({"is_fake": is_fake})


