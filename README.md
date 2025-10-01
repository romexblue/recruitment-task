# recruitment-task: Data Output Viewer

**Live Deployment:** [https://recruitment-task-xi.vercel.app/]

This project is a minimal React + TypeScript + Vite frontend designed to display the results of the `recruitment-task` data processing logic.

It visualizes the two main entities, **Inspections** and **Failure Reports**, along with a **Summary** and any **Failed Messages** in an organized, scrollable table format.

---

## Getting Started

Follow these simple steps to get the application running locally.

### Prerequisites

You need **Node.js** installed on your machine.

### Installation

1.  **Clone the repository** (replace `[https://github.com/romexblue/recruitment-task.git]` with the actual link):
    ```bash
    git clone [https://github.com/romexblue/recruitment-task.git]
    cd recruitment-task
    ```

2.  **Install dependencies** using your preferred package manager:
    ```bash
    npm install
    # OR
    yarn install
    # OR
    pnpm install
    ```

### Running the App

1.  **Start the development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    # OR
    pnpm dev
    ```

2.  The application will be accessible in your browser at the local address printed in your console (typically **`http://localhost:5173`**).

---

## Testing

This project uses **Jest** for automated unit testing, which covers the core data parsing and classification logic (the rules from the recruitment instructions).

To run the unit tests:

```bash
npm run test
# OR
yarn test
# OR
pnpm test

---

## Technical Stack

* **Framework:** React
* **Language:** TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (configured in the project)
