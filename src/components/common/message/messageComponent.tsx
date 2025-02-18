import { MessageProps} from "@/@types/common/messageProps"
import React from "react";

export const Message: React.FC<MessageProps> = ({
color,
text,
field,
}) => {
  return (
    <article className={`message ${color}`}>
      <div className="message-body">
        {field && `${field} :`}{text}
      </div>
    </article>
  );
};
