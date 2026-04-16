export class AlertComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(message) {
        const alertHTML = `
            <div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        this.parent.insertAdjacentHTML('afterbegin', alertHTML);
    }
}
