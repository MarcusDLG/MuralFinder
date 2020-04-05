docker build -t MuralFinder-image .

docker tag MuralFinder-image registry.heroku.com/MuralFinder/web


docker push registry.heroku.com/MuralFinder/web

heroku container:release web -a MuralFinder