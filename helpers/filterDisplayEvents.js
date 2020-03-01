export const filterDisplayEvents = (logged_in_user_id, calendar_screen, eventsForThisDay, keyEvent) => {
    
    //SET CHECKS IF USER IS IN THE EVENT AND IF HE IS ACCEPTED
    let is_logged_user_in_event = false;
    let is_logged_user_in_event_and_accepted = false;
    let has_perimition_to_see_it = true;

    //CHECK IF USER IF ISN'T  HOST AND INVITED PEOPLE ARRAY IS EMPTY, IF YES, USER DOESNT HAVE PERMITION TO SEE THE EVENT
    if(logged_in_user_id != eventsForThisDay[keyEvent].host_id){
        
        if(Object.entries(eventsForThisDay[keyEvent].invited_people).length === 0){
            has_perimition_to_see_it = false;
        }
        
        if(eventsForThisDay[keyEvent].show_to_all === false){
            has_perimition_to_see_it = false;
        }else{
            has_perimition_to_see_it = true; 
        }
        
        
    }

    //CHECK IF USER IS IS AS HOST, IF YES, THEN SET AS HE IN THERE AND AS HE ACCPTED
    if(logged_in_user_id == eventsForThisDay[keyEvent].host_id){
        is_logged_user_in_event = true;
        is_logged_user_in_event_and_accepted = true;
    }
    
    //GO TROUGH ALL INVITED PEOPLE AND IF THERE IS LOGGED USER MARKED AS HE IS IN THE EVENT
    let invited_people = eventsForThisDay[keyEvent].invited_people;
    Object.keys(invited_people).map((keyPerson) => {
        if(logged_in_user_id == invited_people[keyPerson].id){
            is_logged_user_in_event = true;
        }
    });

    //CHECK IF USER IS NOT HOST, IF HE ISNT HOST THEN CHECK IF HE EXIST IN THE INVITED PEOPLE AND IF HE ACCEPTED ALREADY MARK HIM AS HE ACCEPTED THE INVITATION
    if(logged_in_user_id != eventsForThisDay[keyEvent].host_id){
        is_logged_user_in_event_and_accepted = false;
        
        let invited_people = eventsForThisDay[keyEvent].invited_people;

        Object.keys(invited_people).map((keyPerson) => {
            if(logged_in_user_id == invited_people[keyPerson].id && invited_people[keyPerson].status == 'accepted'){
                is_logged_user_in_event_and_accepted = true;
            }
        });
    }
    

    //BUILD THE CHECK BASED ON THE VIEW THIS COMPONENT IS RENDERED. IF IS FROM MY CALENDAR THEN CHECK ONLY IF IS IN THE EVENT AND HE ALREADY ACCEPTED THE INVITATION
    //ELSE, CHECK IF HE IS IN THE EVENT HE MUST ACCEPTED THE INVITATION OR LIST ALL OTHER EVENTS FROM THE COMPANY
    let check_filtering = false;
    if(calendar_screen == "my_calendar"){
        check_filtering = is_logged_user_in_event == true && is_logged_user_in_event_and_accepted == true;
    }else{
        check_filtering = (
                            (
                                is_logged_user_in_event == true && 
                                is_logged_user_in_event_and_accepted == true
                            ) || is_logged_user_in_event == false
                          ) && has_perimition_to_see_it == true;
    }
    
    return check_filtering;
}