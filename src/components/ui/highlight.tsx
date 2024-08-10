import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

type HighlightProps = {
  word: string;
  hoverContent: string;
};

const Highlight: React.FC<HighlightProps> = ({ word, hoverContent }) => (
  <HoverCard>
    <HoverCardTrigger>
      <span className="text-text cursor-pointer">{word}</span>
    </HoverCardTrigger>
    <HoverCardContent side='right' align='end' sideOffset={8} alignOffset={32} className="text-base">
      {hoverContent}
    </HoverCardContent>
  </HoverCard>
);

export default Highlight;
