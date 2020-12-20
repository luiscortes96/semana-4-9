<template>
<div id="app">
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="categorias"
      sort-by="nombre"
      class="elevation-1"

      item-key="name"
    :loading="cargando"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Categorías</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Agregar Categoría
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-textarea
                        v-model="editedItem.descripcion"
                        label="Descripcion"
                        auto-grow
                        no-resize
                        counter="250"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">¿Está seguro de desactivar/Activar este elemento?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Ok</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          medium
          @click="deleteItem(item)"
        >
        <template v-if="item.estado">
             mdi-toggle-switch
        </template>
        <template v-else>
              mdi-toggle-switch-off-outline
        </template>

         
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-app>
  <pre>
      {{$data.categorias}}
  </pre>

</div>
    
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
    dialog: false,
    dialogDelete: false,
    cargando:true,
    headers: [
        
      { text: 'Id', value: 'id' },
      {
        text: 'Categorias',
        align: 'start',
        sortable: true,
        value: 'nombre',
      },
      { text: 'Descripcion', value: 'descripcion' },
      { text: 'Estado', value: 'estado' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    categorias: [],
    editedIndex: -1,
    editedItem: {
      id:0,
      nombre: '',
      descripcion: '',
      estado: 0,
    },
    defaultItem: {
      id:0,
      nombre: '',
      descripcion: '',
      estado: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Crear Categoría' : 'Editar Categoría'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.list()
  },

  methods: {
    list(){
        axios.get('http://localhost:3000/api/categoria/list')
        .then(response=>{
            this.categorias=response.data;
            this.cargando=false;
        })
        .catch(error=>{
            console.log(error);
        })
    },

    editItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
       if (this.editedIndex.estado === 0) {
          //put
        axios.put('http://localhost:3000/api/categoria/deactivate',{
            "id":this.editedItem.id,
        })
        .then(response=>{
            this.list();
        })
        .catch(error=>{
            return error;
        })
      } else {
          //post
        axios.put('http://localhost:3000/api/categoria/activate',{
            "id":this.editedItem.id,
        })
        .then(response=>{
            this.list();
        })
        .catch(error=>{
            return error;
        })
      }
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
          //put
        axios.put('http://localhost:3000/api/categoria/update',{
            "id":this.editedItem.id,
            "nombre":this.editedItem.nombre,
            "descripcion":this.editedItem.descripcion,
        })
        .then(response=>{
            this.list();
        })
        .catch(error=>{
            return error;
        })
      } else {
          //post
        axios.post('http://localhost:3000/api/categoria/add',{
            "estado":1,
            "nombre":this.editedItem.nombre,
            "descripcion":this.editedItem.descripcion,
        })
        .then(response=>{
            this.list();
        })
        .catch(error=>{
            return error;
        })
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
    
}
</script>