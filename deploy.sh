 docker build -t mural-finder-image .

docker tag mural-finder-image registry.heroku.com/kastle-mural-finder/web


docker push registry.heroku.com/kastle-mural-finder/web

heroku container:release web -a kastle-mural-finder

# ./deploy.sh to deploy updated image to heroku.