from django.core.management.base import BaseCommand

from news_site.models import *
from api.v1.serializers import ArticleSerializer
from news_site.utils import create_index, ingest_to_elastic


class Command(BaseCommand):
    help = 'This command is used to ingest data from database to elastic search'

    batch = []

    def add_arguments(self, parser):
        parser.add_argument('--index', '-i', type=str, default='article', help='elastic search index name [default: article]')

    def get_tags(self, tags):
        """
        this method will return tag name from tags objects
        """
        tag_list = []
        for tag in tags:
            tag_list.append(tag["name"])
        return tag_list

    def handle(self, *args, **options):
        print("Ingesting Data from Database\n")
        index = options['index']
        create_index(index)
        for article in Article.objects.all().iterator():
            serializer = ArticleSerializer(article)
            json_data = serializer.data
            if json_data["hash_tags"]:
                tag_list = self.get_tags(json_data["hash_tags"])
                json_data["hash_tags"] = tag_list
            self.batch.append(json_data)
            if len(self.batch) == 999:
                ingest_to_elastic(self.batch, index, index, 'id')
                self.batch = []
                print("Ingesting Batch...!!!")
        ingest_to_elastic(self.batch, index, index, 'id')
        print("Ingesting Final Batch...!!!")
