<jw-modal id="custom-modal-1">
    <h1>A Custom Modal!</h1>
    <p>Home page text: <input type="text" [(ngModel)]="bodyText" /></p>
    <button (click)="closeModal('custom-modal-1');">Close</button>
</jw-modal>
