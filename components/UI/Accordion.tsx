'use client';
import { cn } from '@/utils/tailwind-merge';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
  Variant,
  Variants,
} from 'motion/react';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type AccordionContextType = {
  expandedValues: React.Key[];
  toggleItem: (value: React.Key) => void;
  variants?: { expanded: Variant; collapsed: Variant };
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }
  return context;
}

export type AccordionProviderProps = {
  children: ReactNode;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValues?: React.Key[];
  onValueChange?: (values: React.Key[]) => void;
};

function AccordionProvider({
  children,
  variants,
  expandedValues: externalExpandedValues,
  onValueChange,
}: AccordionProviderProps) {
  const [internalExpandedValues, setInternalExpandedValues] =
    useState<React.Key[]>([]);

  const expandedValues =
    externalExpandedValues !== undefined
      ? externalExpandedValues
      : internalExpandedValues;

  const toggleItem = (value: React.Key) => {
    const newValues = expandedValues.includes(value)
      ? expandedValues.filter((v) => v !== value)
      : [...expandedValues, value];

    if (onValueChange) {
      onValueChange(newValues);
      setInternalExpandedValues(newValues);
    } else {
      setInternalExpandedValues(newValues);
    }
  };

  return (
    <AccordionContext.Provider value={{ expandedValues, toggleItem, variants }}>
      {children}
    </AccordionContext.Provider>
  );
}

export type AccordionProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValues?: React.Key[];
  onValueChange?: (values: React.Key[]) => void;
};

function Accordion({
  children,
  className,
  transition,
  variants,
  expandedValues,
  onValueChange,
}: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn('relative', className)} aria-orientation='vertical'>
        <AccordionProvider
          variants={variants}
          expandedValues={expandedValues}
          onValueChange={onValueChange}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  );
}

export type AccordionItemProps = {
  value: React.Key;
  children: ReactNode;
  className?: string;
};

function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { expandedValues } = useAccordion();
  const isExpanded = expandedValues.includes(value);

  return (
    <div
      className={cn('overflow-hidden', className)}
      {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            //@ts-ignore
            ...child.props,
            value,
            ...(typeof child.type === 'function' && { expanded: isExpanded }),
          });
        }
        return child;
      })}
    </div>
  );
}

export type AccordionTriggerProps = {
  children: ReactNode;
  className?: string;
};

function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem, expandedValues } = useAccordion();
  const value = (props as { value?: React.Key }).value;
  const isExpanded = value !== undefined && expandedValues.includes(value);

  return (
    <button
      onClick={() => value !== undefined && toggleItem(value)}
      aria-expanded={isExpanded}
      type='button'
      className={cn('group', className)}
      {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
    >
      {children}
    </button>
  );
}

export type AccordionContentProps = {
  children: ReactNode;
  className?: string;
};

function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const { expandedValues, variants } = useAccordion();
  const value = (props as { value?: React.Key }).value;
  const isExpanded = value !== undefined && expandedValues.includes(value);

  const BASE_VARIANTS: Variants = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  };

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial='collapsed'
          animate='expanded'
          exit='collapsed'
          variants={combinedVariants}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
