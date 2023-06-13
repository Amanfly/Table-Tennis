


from django import forms
from bootstrap_daterangepicker import widgets, fields



class TournamentForm(forms.Form):
    
    Date = fields.DateRangeField()
    Date_format = fields.DateRangeField(
        input_formats=['%d/%m/%Y'],
        widget=widgets.DateRangeWidget(
            format='%d/%m/%Y'
        )
    )
