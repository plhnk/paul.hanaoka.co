import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
interface ProjectDialogProps {
  children: React.ReactNode;
  content: string;
}
const ProjectDialog: React.FC<ProjectDialogProps> = ({ children, content }) => {
  return (
    <Dialog>
      <DialogTrigger> {children} </DialogTrigger>
      <DialogContent className="border-card p-1 sm:p-4 fixed top-0 left-[calc(1svw_-_.5rem)] sm:left-[calc(3svw_-_2rem)] m-2 sm:m-8 max-w-screen-2xl w-[98svw] sm:w-[94svw] h-[92svh] transform-none">
        <iframe
          className="w-full h-full rounded-sm"
          style={{ border: '1px solid rgba(0, 0, 0, 0.1);' }}
          src={content}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
