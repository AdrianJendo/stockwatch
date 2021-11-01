FROM python:3.8

WORKDIR /backend
RUN pip install pipenv

COPY Pipfile .
COPY Pipfile.lock .
RUN pipenv install

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

COPY . .

CMD ["pipenv", "run", "flask", "run"]