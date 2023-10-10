import { IonBackButton, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import '../Page.css';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeEmployee, searchEmployees } from './EmployeeApi';
import Employee from './Employee';

const EmployeeList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);
  
  const search = async () => {
    let result = await searchEmployees();
    setEmployees(result);
  }

  const addEmployee = () => {
    history.push('/page/Employee/new');
  }

  const editEmployee = (id: string) => {
    history.push('/page/Employee/' + id);
  }

  const remove = async (id: string) => {
    await removeEmployee(id);
    search();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
            <IonTitle>Gestión de Empleados</IonTitle>
            <IonItem>
                <IonButton color='primary' fill='solid' slot='end' size='default' onClick={addEmployee}>
                    <IonIcon icon={add}/>
                    Agregar Empleado
                </IonButton>
            </IonItem>
            <IonGrid className='table'>
                <IonRow>
                    <IonCol>Nombre</IonCol>
                    <IonCol>Email</IonCol>
                    <IonCol>Teléfono</IonCol>
                    <IonCol>Dirección</IonCol>
                    <IonCol>Acciones</IonCol>
                </IonRow>
                {employees.map((employee: Employee) =>
                <IonRow key={employee.id}>
                    <IonCol>{employee.firstname} {employee.lastname}</IonCol>
                    <IonCol>{employee.email}</IonCol>
                    <IonCol>{employee.phone}</IonCol>
                    <IonCol>{employee.address}</IonCol>
                    <IonCol>
                        <IonButton color='primary' fill='clear' onClick={() => editEmployee(String(employee.id))}>
                            <IonIcon icon={pencil}/>
                        </IonButton>
                        <IonButton color='danger' fill='clear' onClick={() => remove(String(employee.id))}>
                            <IonIcon icon={close}/>
                        </IonButton>
                    </IonCol>
                </IonRow>
                )}
        </IonGrid>
        </IonCard>        
      </IonContent>
    </IonPage>
  );
};

export default EmployeeList;
