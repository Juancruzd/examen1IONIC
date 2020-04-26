import { Injectable } from '@angular/core'; 
import { Contact } from '../shared/Contact';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  ContactList: AngularFireList<any>;
  Contact: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createContact(apt: Contact) {
    return this.ContactList.push({
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile
    })
  }

  // Get Single
  getContact(id: string) {
    this.Contact = this.db.object('/crud/' + id);
    return this.Contact;
  }

  // Get List
  getContactList() {
    this.ContactList = this.db.list('/crud');
    return this.ContactList;
  }

  // Update
  updateContact(id, apt: Contact) {
    return this.Contact.update({
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile
    })
  }

  // Delete
  deleteContact(id: string) {
    this.Contact = this.db.object('/crud/' + id);
    this.Contact.remove();
  }
}
