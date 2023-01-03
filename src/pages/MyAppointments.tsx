import {useState, useEffect} from 'react'
import { auth, db } from '../main';
import { collection, getDocs, doc, updateDoc, query, where} from 'firebase/firestore';

interface Appointment {
    uid_user: string,
    uid_practitionner: string,
    date: string,
    cancelled?: boolean
}


export default function MyAppointments() {
    const [todaysAppointment,setTodaysAppointment]:any[] = useState([])
    const [appointments,setAppointments]:any[] = useState([]);
    const [seeAll,setSeeAll] = useState(false);
    const uid_user = auth.currentUser !== null ? auth.currentUser.uid : '0';


    async function cancelAppointment(uid:string){
        const docRef = doc(db,"appointments", uid);
        updateDoc(docRef,{cancelled: true}).then(() => {
            alert('Cancelled !');
            fetchData();
        }).catch((e) => {
            alert('Couldn\'t be cancelled');
            console.log(e);
        });
    }

    function appointmentRow(appointment:{uid:string,data:Appointment}){
        return (
            <div style={{display:'inline-block',width:'100%',background:'white'}}>
                <p style={{display:'inline-block',color:'black'}}>{appointment.data.date}</p>
                <button style={{display:'inline-block'}} onClick={() => cancelAppointment(appointment.uid)}>Cancel appointment</button>
            </div>
        )
    }

    function seeAllButton(){
        let text = ''
        if(seeAll){
            text = 'Show only today'
        }else{
            text = 'See all'
        }
        return (
            <button onClick={() => setSeeAll(!seeAll)}>{text}</button>
        )
    }

    const fetchData = async () => {

        const queryConstraints = []
        queryConstraints.push(where("uid_practitionner", "==", uid_user));
        queryConstraints.push(where("cancelled", "==", false));
        const q = query(collection(db, "appointments"),...queryConstraints  );
        const querySnapshot = await getDocs(q);
        let listAppointments:any[] = [];
        querySnapshot.forEach((doc) => {
            listAppointments.push(
                {
                    uid: doc.id,
                    data: doc.data()
                }
            )
        });
        setAppointments(listAppointments);
        console.log(new Date);
        setTodaysAppointment(listAppointments.filter((appointment:{uid:string,data:Appointment}) => {
            const appointmentDate = new Date(appointment.data.date)
            const today = new Date()
            return appointmentDate.getFullYear() === today.getFullYear() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getDate() === today.getDate()
        }));
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div>
            {seeAll && <h1>All incomming appointments</h1>}
            {!seeAll &&<h1>Today's appointments</h1>}
            {seeAllButton()}
            {seeAll &&
                appointments.map((appointment:{uid:string,data:Appointment}) => {
                    return appointmentRow(appointment); 
                })
            }
            {!seeAll &&
                todaysAppointment.map((appointment:{uid:string,data:Appointment}) => {
                    return appointmentRow(appointment); 
                })
            }
        </div>
    );
}