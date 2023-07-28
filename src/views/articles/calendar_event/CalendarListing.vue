<template>
    <button id="modalButton" type="button" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create tache </button>
      <!-- begin:: modal create tache -->
    <div v-on:hide="closeModal" class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"> <!-- v-if="showEventCreationDialog"  @click="showEventCreationDialog = !showEventCreationDialog" -->
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 v-if="showEventCreationDialog" class="modal-title" id="staticBackdropLabel">Update tache</h5>
                    <h5 v-else class="modal-title" id="staticBackdropLabel">Create tache</h5>
                    <button @click="onCloseModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!--begin::Input group select employee-->
                    <div class="col mb-5">
                        <label for="tacheDebut" class="form-label fw-bold text-dark fs-7 required">Sélectionner Employee</label>
                        <select v-model="tache.employeId" class="form-select form-select-sm form-control-solid" name="Employee" id="">
                            <option v-for="employe in splitDays" @key="employe.id" :value="employe.id">{{ employe.label }}</option>
                        </select>
                    </div>
                    <!--end::Input group select employee-->
                    <!--begin::Input group Date Debut-->
                    <div class="col mb-5">
                        <label for="tacheDebut" class="form-label fw-bold text-dark fs-7 required">Date debut </label>
                        <input class="form-control form-control-sm form-control-solid" id="tacheDebut" type="datetime-local" v-model="tache.start" required> 
                    </div>
                    <!--end::Input group Date Debut-->
                    <!--begin::Input group Date fin-->
                    <div class="col mb-5">
                        <label for="tacheFin" class="form-label fw-bold text-dark fs-7 required">Date fin</label>
                        <input class="form-control form-control-sm form-control-solid" id="tacheFin" type="datetime-local" v-model="tache.finished" required>
                    </div>
                    <!--end::Input group Date fin-->
                    <!--begin::Input group Description-->
                    <div class="col mb-5">
                        <label class="form-label fw-bold text-dark fs-7 required">Description</label>
                        <textarea class="form-control form-control-sm form-control-solid" v-model="tache.description" name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <!--end::Input group Description-->
                    <div class="col mb-5">
                        <span v-if="tacheFieldsProblem">
                        <p class="alert alert-danger">{{tacheFieldsErrorMessage}}</p>
                        </span>
                    </div>
                </div>            
                <div v-if="showEventCreationDialog">
                    <div class="modal-footer">
                        <button @click="onCloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        
                        <button :disabled="loadingDataCar" @click="updateEvent(); isModal = !isModal;" type="button" class="btn btn-primary">
                            <span v-if="loadingDataCar">
                            Please wait...
                            <span
                                class="spinner-border spinner-border-sm align-middle ms-2"
                            ></span>
                            </span>
                            <span v-else >Modifier</span>
                        </button>
                    </div>
                </div>
                <div v-else>
                    <div class="modal-footer">
                        <button @click="onCloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        
                        <button :disabled="loadingDataCar" @click="saveEvent" type="button" class="btn btn-primary">
                            <span v-if="loadingDataCar">
                            Please wait...
                            <span
                                class="spinner-border spinner-border-sm align-middle ms-2"
                            ></span>
                            </span>
                            <span v-else >Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end:: modal create tache  events -->
    <vue-cal 
        today-button
        style="height: 430px;"
        :time-from="6 * 60"
        :time-to="25 * 60"
        :time-step="60"
        :disable-views="['years', 'year']"
        :editable-events="{ titleEditable: false, drag: true, resize: true, delete: false, }"
        :events="myEvents"
        :sticky-split-labels=true
        :min-split-width=200
        v-model:selected-date="selectedDate"
        :drag-to-create-event=false
        :onEventDblclick="onEventDblClick"
        :split-days="splitDays"
        @event-drop="eventChange=$event"
        @event-duration-change="eventChange = $event"
        @event-delete="eventDelete = $event"
        class="vuecal--green-theme"
        :locale="langue"
    />

</template>
  
<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'
    import Swal from "sweetalert2";
    import ApiService from "@/core/services/ApiService";
    import { Modal } from 'bootstrap';
    import moment from "moment";
import type { forEach } from "lodash";
    
    export default defineComponent({
        components: {
            VueCal
        },
        data(){
            return {
                tache: {
                    start: '',
                    finished: '',
                    description: '',
                    employeId: '',
                    id: ''
                },
                tacheFieldsProblem: false,
                tacheFieldsErrorMessage: '',

                myEvents: [],
                selectedDate: '',
                loadingDataCar : false,
                splitDays: [],
                //modifyWithdrop: {},
                showEventCreationDialog: false,
                //dateChangeEvent: '',
                eventDelete : '',

                eventChange: '',
                isModal: false,
                langue: localStorage.getItem("lang")
            }
        },
        mounted() {
            this.getAllEvents();
            this.getEmployees();
        },
        watch: {
            eventChange(){
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Modifier',
                    denyButtonText: `Annuler`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        console.log(this.eventChange);
                        this.tache.description = this.eventChange.event.title;
                        this.tache.employeId = this.eventChange.event.split;
                        this.tache.id = this.eventChange.event.id;
                        this.tache.start = moment(this.eventChange.event.start).format('YYYY-MM-DDTHH:mm:ss');
                        this.tache.finished = moment(this.eventChange.event.end).format('YYYY-MM-DDTHH:mm:ss');
                        this.updateEvent();

                        // Swal.fire('Saved!', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                        this.getAllEvents();
                    }
                })


            },
            eventDelete(){
                console.log(this.eventDelete.id);
                this.deleteEvent(this.eventDelete.id);
            },
            // isModal(){
            //     console.log('the modal is : ', this.isModal);
            // },
            // dateChangeEvent(){
            //     console.log(this.dateChangeEvent);
            //     this.tache.description = this.dateChangeEvent.event.title;
            //     this.tache.employeId = this.dateChangeEvent.event.split;
            //     this.tache.id = this.dateChangeEvent.event.id;
            //     this.tache.start = moment(this.dateChangeEvent.event.start).format('YYYY-MM-DDTHH:mm:ss');
            //     this.tache.finished = moment(this.dateChangeEvent.event.end).format('YYYY-MM-DDTHH:mm:ss');
            //     this.updateEvent();
            // },
            // modifyWithdrop(){
            //     console.log(this.modifyWithdrop);
            //     // updateEventWithdrop(this.modifyWithdrop)
            //     console.log(this.modifyWithdrop.event.start);
            //     console.log(this.modifyWithdrop.event.end);
            //     console.log(this.modifyWithdrop.event.split);
            //     console.log(this.modifyWithdrop.event.id);
            //     console.log(this.modifyWithdrop.event.title);

            //     this.tache.description = this.modifyWithdrop.event.title;
            //     this.tache.employeId = this.modifyWithdrop.event.split;
            //     this.tache.id = this.modifyWithdrop.event.id;
            //     this.tache.start = moment(this.modifyWithdrop.event.start).format('YYYY-MM-DDTHH:mm:ss');
            //     this.tache.finished = moment(this.modifyWithdrop.event.end).format('YYYY-MM-DDTHH:mm:ss');
            //     this.updateEvent();
            // }
        },
        methods: {
            deleteEvent(id){
                return ApiService.delete(`calendar_event/${id}`).then(({data}) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Event deleted",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.getAllEvents();
                }).catch(({error}) => {
                    console.log(error);
                })
            },
            onEventDblClick(event, e){
                console.log(event);
                console.log( moment(event.start).format('Y-m-d h:mm'));
                this.tache.start = moment(event.start).format('YYYY-MM-DDTHH:mm:ss');
                this.tache.finished = moment(event.end).format('YYYY-MM-DDTHH:mm:ss');
                this.tache.description = event.title;
                this.tache.employeId = event.split;
                this.tache.id = event.id;
                this.showEventCreationDialog = true;
                console.log(this.tache);
                console.log(this.showEventCreationDialog);
                console.log("la langue : ", this.langue);
                document.getElementById('modalButton').click();
            },
            updateEvent(){
                if(this.tache.start && this.tache.finished && this.tache.description && this.tache.employeId){
                    if(!this.compareDates(this.tache.start, this.tache.finished)){
                        setTimeout(() => {
                            this.tacheFieldsProblem = false;
                            this.tacheFieldsErrorMessage = "";                      
                        }, 3000);
                        if(!this.isModal){
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: "La différence entre les deux dates est supérieur à 17 heures.",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            this.getAllEvents();
                        }
                        return;
                    }
                    const tache = new FormData();
                    tache.append('date_start', this.tache.start);
                    tache.append('date_end', this.tache.finished);
                    tache.append('description', this.tache.description);
                    tache.append('employeId', this.tache.employeId);
                    tache.append('id', this.tache.id);
                    console.log(this.tache);
                    console.log("Before Api");
                    return ApiService.post(`calendar_event/${this.tache.id}/updateEvent`, tache).then(({data}) => {
                        if(this.isModal){
                            this.closeModal('staticBackdrop');
                            this.isModal = false;
                        }
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: data.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        console.log("After Api");
                        console.log(data);
                        this.tache.start = '';
                        this.tache.finished = '';
                        this.tache.description = '';
                        this.tache.employeId = '';
                        this.tache.id = '';
                        this.getAllEvents();
                    }).catch(({error}) => {
                        console.log(error);
                    });
                }else{
                    this.tacheFieldsProblem = true;
                    this.tacheFieldsErrorMessage = "Please select all fields before submit";
                    setTimeout(() => {
                        this.tacheFieldsProblem = false;
                        this.tacheFieldsErrorMessage = "";                      
                    }, 3000);
                }
            },
            compareDates(start, end){
                const date1 = new Date(start);
                const date2 = new Date(end);

                const diffInMs = Math.abs(date2 - date1);
                const diffInHrs = diffInMs / 36e5;
                if (diffInHrs <= 17) {
                    console.log('The difference between the two dates is less than or equal to 17 hours.');
                    // this.tacheFieldsProblem = true;
                    // this.tacheFieldsErrorMessage = "La différence entre les deux dates est inférieure ou égale à 4 heures.";
                    return true;
                } else {
                    console.log('The difference between the two dates is greater than 17 hours.');
                    this.tacheFieldsProblem = true;
                    this.tacheFieldsErrorMessage = "La différence entre les deux dates est supérieur à 17 heures.";
                    return false;
                }
            },
            saveEvent(){
                if(this.tache.start && this.tache.finished && this.tache.description && this.tache.employeId){
                    if(!this.compareDates(this.tache.start, this.tache.finished)){
                        setTimeout(() => {
                            this.tacheFieldsProblem = false;
                            this.tacheFieldsErrorMessage = "";                      
                        }, 3000);
                        return;
                    }

                    const tache = new FormData();
                    tache.append('date_start', this.tache.start);
                    tache.append('date_end', this.tache.finished);
                    tache.append('description', this.tache.description);
                    tache.append('employeId', this.tache.employeId);
                    console.log(this.tache.start);
                    return ApiService.post("calendar_event/store", tache).then(({data}) => {
                        this.closeModal('staticBackdrop');
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: data.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this.tache.start = '';
                        this.tache.finished = '';
                        this.tache.description = '';
                        this.tache.employeId = '';
                        this.getAllEvents();
                    }).catch(({error}) => {
                        console.log(error);
                    });
                }else{
                    this.tacheFieldsProblem = true;
                    this.tacheFieldsErrorMessage = "Please select all fields before submit";
                    setTimeout(() => {
                        this.tacheFieldsProblem = false;
                        this.tacheFieldsErrorMessage = "";                      
                    }, 3000);
                }
            },
            closeModal: function(idModal) {
                const modal = document.getElementById(idModal);
                const modalInstance = Modal.getInstance(modal);
                modalInstance.hide();
            },
            onCloseModal(){
                this.showEventCreationDialog = false;
                this.tache.start = '';
                this.tache.finished = '';
                this.tache.description = '';
                this.tache.employeId = '';
                this.tache.id = '';
            },
            getAllEvents(){
                return ApiService.get("calendar_event/getEvents").then(({data}) => {
                    let elements = data;
                    let result = [];
                    let tmp = {id: 1, start : '', end: '', title: '', split: 0, class: 'health'};
                    elements.forEach((element, index) => {
                        tmp.start = element.date_start;
                        tmp.end = element.date_end;
                        tmp.title = element.description;
                        tmp.split = element.employee_id;
                        tmp.id = element.id;
                        result.push({id: tmp.id, start: element.date_start, end: element.date_end, title: element.description, split: element.employee_id, class: 'health'})
                    });
                    console.log(result);
                    this.myEvents = result;
                }).catch(({error}) => {
                    console.log(error);
                });
            },
            getEmployees(){
                return ApiService.get("calendar_event/getEmployees").then(({data}) => {
                    let response = data;
                    let splitDays = { id: 1, label: '' };
                    let result = new Array();
                    response.forEach(element => {
                        splitDays.id = element.id;
                        splitDays.label = element.first_name +' '+ element.last_name;
                        result.push({id: element.id, label: element.first_name +' '+ element.last_name})
                    });
                    console.log(result);
                    this.splitDays = result;
                }).catch(({error}) => {
                    console.log(error);
                });
            }
        },
        async created() {
    
        },
    });
</script>
<style>
    .blue-event {background-color: rgba(76, 172, 175, 0.35)}
    .vuecal__event--dragging {background-color: rgba(76, 172, 175, 0.35);}

    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
    .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
    .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
    .vuecal__event-title {
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
  