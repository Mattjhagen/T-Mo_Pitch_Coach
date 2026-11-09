import { CONVERSATION_NODES } from '../data/conversationTree';
import { OBJECTIONS_DATA } from '../data/objections';
import { BUYING_SIGNALS_DATA } from '../data/buyingSignals';

export interface ValidationReport {
  isValid: boolean;
  totalNodes: number;
  totalObjections: number;
  totalBuyingSignals: number;
  brokenLinks: { fromNode: string; targetNode: string }[];
  terminalNodes: string[];
  stagesCovered: string[];
}

export function validateDecisionTree(): ValidationReport {
  const nodeKeys = Object.keys(CONVERSATION_NODES);
  const brokenLinks: { fromNode: string; targetNode: string }[] = [];
  const terminalNodes: string[] = [];
  const stagesCovered = new Set<string>();

  nodeKeys.forEach((key) => {
    const node = CONVERSATION_NODES[key];
    stagesCovered.add(node.stage);

    if (node.isTerminal) {
      terminalNodes.push(node.id);
    }

    node.responses.forEach((resp) => {
      if (!CONVERSATION_NODES[resp.nextNodeId]) {
        brokenLinks.push({
          fromNode: node.id,
          targetNode: resp.nextNodeId,
        });
      }
    });
  });

  // Verify objections nextNodeIds if present
  OBJECTIONS_DATA.forEach((obj) => {
    obj.reactions.forEach((reaction) => {
      if (reaction.nextNodeId && !CONVERSATION_NODES[reaction.nextNodeId]) {
        brokenLinks.push({
          fromNode: `objection:${obj.id}`,
          targetNode: reaction.nextNodeId,
        });
      }
    });
  });

  // Verify buying signals nextNodeIds
  BUYING_SIGNALS_DATA.forEach((sig) => {
    if (sig.targetNodeId && !CONVERSATION_NODES[sig.targetNodeId]) {
      brokenLinks.push({
        fromNode: `buying_signal:${sig.id}`,
        targetNode: sig.targetNodeId,
      });
    }
  });

  return {
    isValid: brokenLinks.length === 0,
    totalNodes: nodeKeys.length,
    totalObjections: OBJECTIONS_DATA.length,
    totalBuyingSignals: BUYING_SIGNALS_DATA.length,
    brokenLinks,
    terminalNodes,
    stagesCovered: Array.from(stagesCovered),
  };
}
