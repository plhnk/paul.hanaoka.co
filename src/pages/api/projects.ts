import type { NextApiRequest, NextApiResponse } from 'next';
import projectsData from '../../lib/data/projects.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('fetching projects data...')
        res.status(200).json(projectsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}