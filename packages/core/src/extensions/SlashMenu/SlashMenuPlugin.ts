import { Plugin, PluginKey } from "prosemirror-state";
import { BlockNoteEditor } from "../../BlockNoteEditor";
import {
  setupSuggestionsMenu,
  SuggestionsMenuState,
  SuggestionsMenuCallbacks,
} from "../../shared/plugins/suggestion/SuggestionPlugin";
import { BaseSlashMenuItem } from "./BaseSlashMenuItem";
import { Editor } from "@tiptap/core";
import { BlockSchema } from "../Blocks/api/blockTypes";

export const slashMenuPluginKey = new PluginKey("SlashMenuPlugin");
export const setupSlashMenu = <
  BSchema extends BlockSchema,
  SlashMenuItem extends BaseSlashMenuItem<BSchema>
>(
  editor: BlockNoteEditor<BSchema>,
  tiptapEditor: Editor,
  updateSlashMenu: (
    slashMenuState: SuggestionsMenuState<SlashMenuItem>
  ) => void,
  items: SlashMenuItem[]
): {
  plugin: Plugin;
  callbacks: Omit<SuggestionsMenuCallbacks<SlashMenuItem>, "destroy">;
} => {
  return setupSuggestionsMenu<SlashMenuItem, BSchema>(
    editor,
    tiptapEditor,
    updateSlashMenu,

    slashMenuPluginKey,
    "/",
    (query) => items.filter((item: SlashMenuItem) => item.match(query)),
    ({ item, editor }) => item.execute(editor)
  );
};
