import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ClientesService } from '../../services/clientes-service'
import { Cliente } from '../../models/cliente'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css'
})
export class ClientesList implements OnInit {

  clienteList = new Array<Cliente>()
  dias = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  fullname: string
  address: string
  phone: string
  waterbottle: number
  deliveryday: string
  description: string

  id2: string
  fullname2: string
  address2: string
  phone2: string
  waterbottle2: number
  deliveryday2: string
  description2: string

  @ViewChild('see') see: any
  @ViewChild('fullnameInput') fullnameInput!: ElementRef

  constructor(private clientesService: ClientesService, private modalService: NgbModal, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAll()
  }

  // 1. Obtener y mostrar un listado de todos los objetos
  getAll() {
    this.clientesService.getAll().subscribe(response => {
      this.clienteList = response
      this.clearInputs()
    }, error => {
      console.log(error)
      alert('Error al obtener los clientes')
    })
  }

  // 3. Cargar todos los datos y agregar un nuevo objeto
  add() {
    if (this.fullname.trim() !== '' && this.address.trim() !== '' && this.phone.trim() !== '' &&
      this.waterbottle > 0 && this.deliveryday !== '') {
      let cliente = new Cliente()
      cliente.fullname = this.fullname
      cliente.address = this.address
      cliente.phone = this.phone
      cliente.waterbottle = this.waterbottle
      cliente.deliveryday = this.deliveryday
      cliente.description = this.description
      this.clientesService.add(cliente).subscribe(() => {
        this.getAll()
      }, error => {
        console.log(error)
        alert('Error al agregar el cliente')
      })
    } else {
      alert('Complete todos los campos obligatorios')
    }
  }

  // 2. Obtener y mostrar los datos de un objeto al hacer click en la tabla
  view(see: any, cliente: Cliente) {
    this.id2 = cliente.id
    this.fullname2 = cliente.fullname
    this.address2 = cliente.address
    this.phone2 = cliente.phone
    this.waterbottle2 = cliente.waterbottle
    this.deliveryday2 = cliente.deliveryday
    this.description2 = cliente.description
    this.modalService.open(see).result.then(result => {
      if (result === 'update') {
        this.update()
      } else if (result === 'delete') {
        this.delete(this.id2)
      }
    }, () => {
      this.clearInputs()
    })
  }

  // 4. A la opción 2, agregarle la funcionalidad para actualizar los datos de un objeto
  update() {
    if (this.fullname2.trim() !== '' && this.address2.trim() !== '' && this.phone2.trim() !== '' &&
      this.waterbottle2 > 0 && this.deliveryday2 !== '') {
      let cliente = new Cliente()
      cliente.id = this.id2
      cliente.fullname = this.fullname2
      cliente.address = this.address2
      cliente.phone = this.phone2
      cliente.waterbottle = this.waterbottle2
      cliente.deliveryday = this.deliveryday2
      cliente.description = this.description2
      this.clientesService.update(cliente).subscribe(() => {
        this.getAll()
      }, error => {
        console.log(error)
        alert('Error al actualizar el cliente')
      })
    } else {
      alert('Complete todos los campos obligatorios')
    }
  }

  // 5. A la opción 2, agregarle la funcionalidad para dar de baja un objeto
  delete(id: string) {
    this.clientesService.delete(id).subscribe(() => {
      this.getAll()
    }, error => {
      console.log(error)
      alert('Error al borrar el cliente')
    })
  }

  clearInputs() {
    this.fullname = ''
    this.address = ''
    this.phone = ''
    this.waterbottle = 0
    this.deliveryday = ''
    this.description = ''
    this.changeDetector.detectChanges()
    setTimeout(() => {
      if (this.fullnameInput) {
        this.fullnameInput.nativeElement.focus()
      }
    }, 100)
  }
}
