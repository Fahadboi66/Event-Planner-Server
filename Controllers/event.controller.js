let events = [];

export const createEvent = async (req, res) => {
    const {name, description, category, date, time} = req.body;

    if(!name || !description || !date || !time || !category){
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const newEvent = new Event({
            name,
            description,
            category,
            date,
            time
        });

        events.push(newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAllEvents = async (req, res) => {

    if(events.length === 0){
        return res.status(404).json({message: "No events found"});
    }
    //view their upcoming events sorted by date.

    events.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });

    
    res.status(200).json(events);
}

export const getEventById = async (req, res) => {
    const id = req.params.id;

    const event = events.find(event => event.id === id);

    if(!event){
        return res.status(404).json({message: "Event not found"});
    }

    res.status(200).json(event);
}

export const updateEvent = async (req, res) => {
    const id = req.params.id;
    const {name, description} = req.body;

    const event = events.find(event => event.id === id);

    if(!event){
        return res.status(404).json({message: "Event not found"});
    }

    event.name = name;
    event.description = description;

    res.status(200).json(event);
}

export const deleteEvent = async (req, res) => {

    const id = req.params.id;

    const event = events.find(event => event.id === id);

    if(!event){
        return res.status(404).json({message: "Event not found"});
    }

    events = events.filter(event => event.id !== id);
    
    res.status(200).json({message: "Event deleted successfully"});
}