import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import '../Page.css';
import { add, checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveEmployee, searchEmployeeById } from './EmployeeApi';
import Employee from './Employee';

const EmployeeEdit: React.FC = () => {

  const { name } = useParams<{ name: string;}>();
  const [employee, setEmployee] = useState<Employee>({});
  const history = useHistory();  
  const routeMatch: any = useRouteMatch("/page/employee/:id"); 
  const id = routeMatch?.params?.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);
  
  const search = async () => {
    if(id === 'new') {
      setEmployee({});
    } else {
        let result = await searchEmployeeById(id);
        setEmployee(result);
    }
  }

  const save = async () => {
    await saveEmployee(employee);
    history.push('/page/employees');
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
          <IonTitle>{id === 'new' ? 'Agregar Empleado' : 'Editar Empleado'}</IonTitle>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput label="Nombre" labelPlacement="stacked" value={employee.firstname} onIonChange={e => employee.firstname = String(e.detail.value)}></IonInput>
                  </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonInput label="Apellido" labelPlacement="stacked" value={employee.lastname} onIonChange={e => employee.lastname = String(e.detail.value)}></IonInput>
                </IonItem>
              </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput label="Email" labelPlacement="stacked" type="email" placeholder="email@domain.com" value={employee.email} onIonChange={e => employee.email = String(e.detail.value)}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput label="Teléfono" labelPlacement="stacked" value={employee.phone} onIonChange={e => employee.phone = String(e.detail.value)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput label="Dirección" labelPlacement="stacked" value={employee.address} onIonChange={e => employee.address = String(e.detail.value)}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
            </IonCol>
          </IonRow>
          <IonItem>
            <IonButton color='success' fill='solid' slot='end' size='default' onClick={save}>
              <IonIcon icon={checkmark}/>
                Guardar
            </IonButton>
          </IonItem>
        </IonCard>      
      </IonContent>
    </IonPage>
  );
};

export default EmployeeEdit;