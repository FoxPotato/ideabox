from django.db import models

SECTORS = (
    ('Autotechniek', 'Autotechniek'),
    ('Bouw', 'Bouw'),
    ('CIOS', 'CIOS'),
    ('Dans en Theater', 'Dans en Theater'),
    ('Entree', 'Entree'),
    ('Handel en Commercie', 'Handel en Commercie'),
    ('Horeca en Facility', 'Horeca en Facility'),
    ('ICT', 'ICT'),
    ('Lab', 'Lab'),
    ('Logistiek', 'Logistiek'),
    ('Maritiem', 'Maritiem'),
    ('Marketing en Media', 'Marketing en Media'),
    ('MyTec', 'MyTec'),
    ('Orde en Veiligheid', 'Orde en Veiligheid'),
    ('Recreatie', 'Recreatie'),
    ('Techniek', 'Techniek'),
    ('Uiterlijke Verzorging', 'Uiterlijke Verzorging'),
    ('Welzijn', 'Welzijn'),
    ('Zakelijk', 'Zakelijk'),
    ('Zorg', 'Zorg'),
)


# Create your models here.
class IdeaModel(models.Model):
    student_number = models.CharField(max_length=256)
    sector = models.CharField(max_length=256, choices=SECTORS)

    title = models.CharField(max_length=256)
    message = models.TextField()
    signature = models.ImageField()
