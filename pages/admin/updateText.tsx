import { useAuth } from '../../context/AuthContext';

const UpdateTextPanel = () => {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <p>Access Denied</p>;
    }

    const updateText = async (id: string, text: string) => {
        // Assuming you have an API endpoint to handle this update
        const response = await fetch(`/api/updateText`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, text }),
        });

        if (!response.ok) {
            throw new Error('Failed to update text');
        }
    };

    return (
        <div>
            <input type="text" id="topicText" placeholder="Update Topic" />
            <button onClick={() => {
                const topicTextElement = document.getElementById('topicText') as HTMLInputElement | null;
                const topicValue = topicTextElement ? topicTextElement.value : 'Welcome to @audhdities!!';
                updateText('topicPanel', topicValue);
            }}>Update Topic</button>
            <input type="text" id="announcementText" placeholder="Update Announcement" />
            <button onClick={() => {
                const announcementTextElement = document.getElementById('announcementText') as HTMLInputElement | null;
                const announcementValue = announcementTextElement ? announcementTextElement.value : 'autistic | adhd | neurodivergent | time wizard';
                updateText('scheduleAnnouncement', announcementValue);
            }}>Update Announcement</button>
        </div>
    );
};

export default UpdateTextPanel;
