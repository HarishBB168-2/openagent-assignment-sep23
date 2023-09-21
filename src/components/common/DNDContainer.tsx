import { Dispatch, SetStateAction } from "react";
import { Flex } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableItemProps = {
  children: React.ReactNode;
  id: UniqueIdentifier;
};

const SortableItem = (props: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Flex m="3" p="2" flexDir="column" alignItems="center">
        <Flex
          p="1"
          bg="white"
          w="100%"
          justifyContent="center"
          {...attributes}
          {...listeners}
        >
          <i className="fa-solid fa-grip-vertical fa-rotate-90"></i>
        </Flex>
        {props.children}
      </Flex>
    </div>
  );
};

type DNDContainerProps = {
  items: any[];
  setItems: Dispatch<SetStateAction<any[]>>;
};

const DNDContainer = ({ items, setItems }: DNDContainerProps) => {
  const handleDragEnd = (e: DragEndEvent) => {
    //
    console.log("Drag end called");
    const { active, over } = e;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over?.id);

    if (active.id !== over?.id) {
      setItems((items: any[]) => {
        const activeIndex = items.findIndex(({ name }) => name === active.id);
        const overIndex = items.findIndex(({ name }) => name === over?.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(({ name }) => name)}>
        {items.map((item) => (
          <SortableItem key={item.name} id={item.name}>
            {item.data}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DNDContainer;
