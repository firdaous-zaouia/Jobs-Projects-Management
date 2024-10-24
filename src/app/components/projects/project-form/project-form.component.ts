import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from 'src/app/shard/date.validators';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent {
  projectForm!: FormGroup;
  categories: string[]=[
    'Education',
    'Environement',
    'Art et Culture',
    'Santé',
    'Social et Communautaire',
    'Sport',
    'Humanitaire',
    'Science et Recherche',
    'Transport et Mobilité',
    'Immobilier'
  ];
  localisations: string[]=[
    'Luxembourg',
    'Steinsel',
    'Esch-sur-Alzette',
    'Differdange',
    'Dudelange',
    'Ettelbruck',
    'Diekirch',
    'Wiltz',
    'Remich',
    'Strassen'
  ]
  //Récuperer des controleurs du formulaire pour les validations
  get titre(){
    return this.projectForm.get("titre");
  }

  get categorie(){
    return this.projectForm.get("categorie");
  }

  get localisation(){
    return this.projectForm.get("localisation");
  }

  get montantAtteindre(){
    return this.projectForm.get("montantAtteindre");
  }

  get  dateCreation(){
    return this.projectForm.get("dateCreation");
  }

  get  dateLimite(){
    return this.projectForm.get("dateCreation");
  }

  get description(){
    return this.projectForm.get("description");
  }

  constructor(
    private fb: FormBuilder){}

    ngOnInit(){
      this.projectForm = this.fb.group(
        {
        titre: ["",[Validators.required,
                    Validators.minLength(3),
                    Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$"),
                  ]
                 ],
        categorie: ["",[Validators.required,
                         Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")],
                     ],
        localisation :["",[Validators.required,
                      Validators.pattern("^[a-zA-ZÀ-ÿ\\s-]+$")],
                  ],
        montantAtteindre :["",[Validators.required,
                              Validators.min(0)]
                         ],
        dateCreation :["",Validators.required],
        dateLimite :["",Validators.required],
        description :["",Validators.required]
      },{ Validators:DateValidator}
    );
    }
  
  
}
