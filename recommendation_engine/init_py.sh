sudo killall -9 Python
# rm -rf venv
python3 -m venv venv
pip install --upgrade pip
pip install -r './requirements.txt'
source "./venv/bin/activate"
export FLASK_APP=app.py
export FLASK_ENV=development
export PYTHONPATH=/opt/anaconda3/lib/python3.7/site-packages
# python3 app.py
flask run --port 9999