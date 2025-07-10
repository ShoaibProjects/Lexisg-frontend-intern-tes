# Lexisg-frontend-intern-test

This project is a minimal frontend interface for a Lexi-like legal assistant, created as a solution for the Lexi Frontend Assignment. The application allows users to ask a legal question, receive a generated answer, and view citations from relevant documents.

## 🚀 Features

-   **Chat-like Interface**: A user-friendly, chat-based UI for a natural and intuitive user experience.
-   **Simulated API Interaction**: Demonstrates frontend-backend communication with a mock API, showcasing how to handle asynchronous data fetching and loading states.
-   **Interactive Citations**: Each generated answer includes a clickable citation that opens the source PDF in a new tab, allowing users to verify the information.
-   **Responsive Design**: The interface is fully responsive and works seamlessly on both desktop and mobile devices.

---

## 📸 Screen Recording

https://github.com/user-attachments/assets/ababea82-8a60-46fc-a5a1-7dd3f80ae945

---

## 🛠️ How to Run the Project

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine. You can download them from [here](https://nodejs.org/).

### Installation & Execution

1.  Clone the repository:
    ```sh
    git clone https://github.com/ShoaibProjects/Lexisg-frontend-intern-tes
    ```
2.  Navigate to the project directory:
    ```sh
    cd Lexisg-frontend-intern-test
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Run the application:
    ```sh
    npm start
    ```

The application will be available at `http://localhost:3000`.

---

## 🚀 Deployment

The application is deployed and can be accessed live at the following link:

**Live Demo**: **[https://lexisg-frontend-intern-tes.vercel.app/](https://lexisg-frontend-intern-tes.vercel.app/)**

---

## 📂 How Citation Linking Was Handled

The citation linking is managed within the main component through a simulated API call. Here’s a breakdown of the process:

1.  **Simulated API Response**: The `simulateApiCall` function returns a promise that resolves with a mock API response containing the answer and an array of citations. Each citation object includes the text, the source file name, and a direct link to the PDF document.
    ```javascript
    const response = {
      answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988...",
      citations: [
        {
          text: "As the age of the deceased at the time of accident was held to be about 54–55 years...",
          source: "Dani_Devi_v_Pritam_Singh.pdf",
          link: "[https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz](https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz)"
        }
      ]
    };
    ```
2.  **Rendering Citations**: The UI maps over the `citations` array and renders each citation within the bot's message bubble.
3.  **Clickable Link**: Each citation is rendered as an `<a>` tag. The `href` attribute is set to the `link` from the citation object. `target="_blank"` and `rel="noopener noreferrer"` are used to open the PDF in a new tab for security and a better user experience.
    ```jsx
    <a
      href={citation.link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
    >
      <LuFileText size={16} />
      <span>{citation.source}</span>
    </a>
    ```
4.  **Bonus: Scrolling and Highlighting**: While the current implementation opens the PDF in a new tab, a more advanced solution for scrolling to a specific paragraph could be achieved by appending a hash fragment to the URL (e.g., `#page=2&highlight=...`), provided the PDF viewer supports it. This project keeps it simple by linking directly to the document.

---

## 💻 Built With

-   [React.js](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [React Icons](https://react-icons.github.io/react-icons/)
