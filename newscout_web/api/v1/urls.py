from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title="Newscout API Documentation")

from .views import (CategoryListAPIView, ArticleListAPIView, SignUpAPIView,
                    LoginAPIView, LogoutAPIView, SourceListAPIView,
                    ArticleDetailAPIView, ArticleBookMarkAPIView,
                    ArticleRecommendationsAPIView, ForgotPasswordAPIView,
                    ChangePasswordAPIView, UserHashTagAPIView, BookmarkArticleAPIView,
                    ArtilcleLikeAPIView, HashTagAPIView, ArticleSearchAPI, MenuAPIView,
                    DevicesAPIView, NotificationAPIView, SocialLoginView,
                    TrendingArticleAPIView, ArticleCreateUpdateView,
                    CategoryBulkUpdate, GetDailyDigestView,
                    ChangeArticleStatusView, DraftMediaUploadViewSet)

url_router = DefaultRouter()
url_router.register(r'article/draft-image', DraftMediaUploadViewSet, basename='draft-media')

urlpatterns = [
    url('', include(url_router.urls)),
    url(r'^documentation/', schema_view),
    url(r'^trending/$', TrendingArticleAPIView.as_view(),
        name="trending"),
    url(r'^categories/bulk/$', CategoryBulkUpdate.as_view(),
        name="category-bulk-update"),
    url(r'^categories/$', CategoryListAPIView.as_view(),
        name="category-list"),
    url(r'^articles/$', ArticleListAPIView.as_view(),
        name="articles-list"),
    url(r'^articles/like-news-list/$', ArtilcleLikeAPIView.as_view(),
        name="users-articles-list"),
    url(r'^bookmark-articles/bookmark-news-list/$', BookmarkArticleAPIView.as_view(),
        name="user-bookmarks"),
    url(r'^tags/$', HashTagAPIView.as_view(), name='hash-tags'),
    url(r'^tags/save/$', UserHashTagAPIView.as_view(),
        name="save-tags"),
    url(r'^source/$', SourceListAPIView.as_view(),
        name="source-list"),
    url(r'^articles/vote/$', ArticleDetailAPIView.as_view(),
        name="vote-article"),
    url(r'^articles/bookmark/$', ArticleBookMarkAPIView.as_view(),
        name="bookmark-article"),
    url(r'^articles/(?P<article_id>[-\d]+)/$', ArticleDetailAPIView.as_view(),
        name="articles-list"),
    url(r'^articles/(?P<article_id>[-\d]+)/recommendations/$',
        ArticleRecommendationsAPIView.as_view(),
        name="articles-list"),
    url(r'^signup/$', SignUpAPIView.as_view(),
        name="signup"),
    url(r'^login/$', LoginAPIView.as_view(),
        name="login"),
    url(r'^logout/$', LogoutAPIView.as_view(),
        name="logout"),
    url(r'^forgot-password/$', ForgotPasswordAPIView.as_view(),
        name="forgot-password"),
    url(r'^change-password/$', ChangePasswordAPIView.as_view(),
        name="change-password"),
    url(r'^article/search', ArticleSearchAPI.as_view(),
        name='article-search'),
    url(r'^menus/$', MenuAPIView.as_view(),
        name='menus'),
    url(r'^device/$', DevicesAPIView.as_view(),
        name='device'),
    url(r'^notification/$', NotificationAPIView.as_view(),
        name='notification'),
    url(r'^social-login/$', SocialLoginView.as_view(),
        name='social-login'),
    url(r'^article/create-update/$', ArticleCreateUpdateView.as_view(),
        name='article-create-update'),
    url(r'^article/status/$', ChangeArticleStatusView.as_view(),
        name='article-status'),
    url(r'daily-digest/$', GetDailyDigestView.as_view(), name='daily-digest')
]
