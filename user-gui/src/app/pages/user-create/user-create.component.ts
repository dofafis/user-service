import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-create',
  providers: [MessageService],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup
  genders: SelectItem[] = [
    {
      label: 'Selecione...',
      value: ''
    },
    {
      label: 'Masculino',
      value: 'Masculino'
    }, 
    {
      label: 'Feminino',
      value: 'Feminino'
    }, 
    {
      label: 'Outro',
      value: 'Outro'
    }
  ]
  duplicatedEmail: string = ''
  duplicatedCpf: string = ''

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(5), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      cpf: new FormControl('', Validators.required),
      gender: new FormControl(''),
      birthDate: new FormControl(new Date(), Validators.required),
      cep: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      complement: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      ddd: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    })

    this.userForm.get('cep').valueChanges.subscribe(async cep => {
      if(cep && cep.length === 9)
        await this.fillAddressByCep()
    })
  }

  async fillAddressByCep(): Promise<void> {
    const cep = this.userForm.value.cep.replace('-', '')
    try {
      const response = await this.httpClient.get(`${environment.address_api}/${cep}/json/`).toPromise()
      if (response) {
        this.userForm.controls['street'].setValue(response['logradouro'])
        this.userForm.controls['complement'].setValue(response['complemento'])
        this.userForm.controls['city'].setValue(response['localidade'])
        this.userForm.controls['state'].setValue(response['uf'])
        this.userForm.controls['neighborhood'].setValue(response['bairro'])
      }
    } catch(error) {
      console.log('Erro ao requisitar o endereço com o CEP dado.')
    }
  }

  async onFormSubmit(): Promise<void> {
    const userReq = {
      name: this.userForm.value.name,
      cpf: this.userForm.value.cpf.replace(/-/g, '').split('.').join(''),
      gender: this.userForm.value.gender,
      email: this.userForm.value.email,
      birthDate: new Date(this.userForm.value.birthDate).toISOString(),
      address: {
        cep: this.userForm.value.cep.replace(/-/g, ''),
        neighborhood: this.userForm.value.neighborhood,
        street: this.userForm.value.street,
        number: this.userForm.value.number,
        complement: this.userForm.value.complement,
        city: this.userForm.value.city,
        state: this.userForm.value.state
      },
      phone: {
        ddd: this.userForm.value.ddd,
        phoneNumber: this.userForm.value.phoneNumber.replace(/-/g, '').replace(/./g, '')
      }
    }

    this.duplicatedCpf = this.duplicatedEmail = ''
    await this.httpClient.post(`${environment.user_api}/user`, userReq).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl('user-create-success')
      },
      error => {
        if(error.error.message === 'USER_DUPLICATE_CPF')
          this.duplicatedCpf = 'CPF já cadastrado...'
        if(error.error.message === 'USER_DUPLICATE_EMAIL')
          this.duplicatedEmail = 'Email já cadastrado...'
      }
    )
  }

}
