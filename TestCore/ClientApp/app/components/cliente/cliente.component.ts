import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../Services/cliente.service';
import { ICliente } from '../../Models/cliente.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

    clientes: ICliente[] = [];
    cliente: ICliente = <ICliente>{};

    //formulario
    formLabel: string;
    isEditMode= false;
    form: FormGroup;

    constructor(private clienteService: ClienteService,
        private fb: FormBuilder)
    {
        this.form = fb.group({
            "nome": ["", Validators.required],
            "endereco": ["", Validators.required],
            "telefone": ["", Validators.required],
            "email": ["", Validators.required]
        });

        this.formLabel = "Adicionar Cliente";
    }

    ngOnInit() {
        this.getClientes();
    }

    private getClientes() {
        this.clienteService.getClientes().subscribe(
            data => this.clientes = data,
            error => alert(error),
            () => console.log(this.clientes)
        );
    }

    onSubmit() {
        this.cliente.nome = this.form.controls["nome"].value;
        this.cliente.endereco = this.form.controls["endereco"].value;
        this.cliente.telefone = this.form.controls["telefone"].value;
        this.cliente.email = this.form.controls["email"].value;

        if (this.isEditMode) {
            this.clienteService.editCliente(this.cliente).subscribe(
                response => {
                    this.getClientes();
                    this.form.reset();
                    this.cancel();
                }
            );
        } else {
            this.clienteService.addCliente(this.cliente).subscribe(
                response => {
                    this.getClientes();
                    this.form.reset();
                }
            );
        }
    }

    cancel() {
        this.formLabel = "Adicionar Cliente";
        this.isEditMode = false;
        this.cliente = <ICliente>{};
        this.form.controls["nome"].setValue('');
        this.form.controls["endereco"].setValue('');
        this.form.controls["telefone"].setValue('');
        this.form.controls["email"].setValue('');
    }

    edit(cliente: ICliente) {
        this.formLabel = "Editar Cliente";
        this.isEditMode = true;
        this.cliente = cliente;
        this.form.controls["nome"].setValue(cliente.nome);
        this.form.controls["endereco"].setValue(cliente.endereco);
        this.form.controls["telefone"].setValue(cliente.telefone);
        this.form.controls["email"].setValue(cliente.email);
    }

    delete(cliente: ICliente) {
        if (confirm("Deseja excluir este cliente?")) {
            this.clienteService.deleteCliente(cliente.id).subscribe(
                response => {
                    this.getClientes();
                    this.form.reset();
                    this.cancel();
                }
            );
        }
    }
}