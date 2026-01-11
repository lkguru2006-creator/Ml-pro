import flet as ft
from data.tasks_handler import load_tasks, save_tasks

class TasksView(ft.Container):
    def __init__(self):
        super().__init__()
        self.expand = True
        self.padding = 30
        
        self.tasks = load_tasks()
        
        self.task_list = ft.Column(spacing=10)
        self.refresh_tasks(update=False)

        self.content = ft.Column(
            controls=[
                ft.Text("Today's Tasks", size=32, weight=ft.FontWeight.BOLD),
                ft.Text("Complete these to keep your streak alive!", size=16, color=ft.Colors.GREY_500),
                ft.Divider(height=20, color=ft.Colors.TRANSPARENT),
                self.task_list,
                ft.FloatingActionButton(
                    icon="add", 
                    on_click=self.add_task_dialog
                )
            ],
            scroll=ft.ScrollMode.AUTO,
        )

    def refresh_tasks(self, update=True):
        self.task_list.controls.clear()
        for task in self.tasks:
            self.task_list.controls.append(self.create_task_item(task))
        if update and self.page:
            self.update()

    def create_task_item(self, task):
        checkbox = ft.Checkbox(
            value=task["completed"],
            label=task["text"],
            on_change=lambda e, t=task: self.toggle_task(e, t)
        )
        return ft.Container(
            padding=15,
            bgcolor=ft.Colors.WHITE,
            border_radius=10,
            border=ft.border.all(1, ft.Colors.GREY_200 if not task["completed"] else ft.Colors.GREEN_200),
            content=ft.Row(
                alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                controls=[
                    checkbox,
                    ft.IconButton(
                        "delete_outline",
                        icon_color=ft.Colors.RED_400,
                        on_click=lambda e, t=task: self.delete_task(t)
                    )
                ]
            )
        )

    def toggle_task(self, e, task):
        task["completed"] = e.control.value
        save_tasks(self.tasks)
        self.refresh_tasks()

    def delete_task(self, task):
        self.tasks.remove(task)
        save_tasks(self.tasks)
        self.refresh_tasks()

    def add_task_dialog(self, e):
        task_input = ft.TextField(label="What do you want to learn?", autofocus=True)
        
        def close_dlg(e):
            if e.control.text == "Add" and task_input.value:
                new_id = max([t["id"] for t in self.tasks], default=0) + 1
                new_task = {"id": new_id, "text": task_input.value, "completed": False}
                self.tasks.append(new_task)
                save_tasks(self.tasks)
                self.refresh_tasks()
            dlg.open = False
            self.page.update()

        dlg = ft.AlertDialog(
            title=ft.Text("Add New Task"),
            content=task_input,
            actions=[
                ft.TextButton("Cancel", on_click=close_dlg),
                ft.TextButton("Add", on_click=close_dlg),
            ],
        )
        self.page.dialog = dlg
        dlg.open = True
        self.page.update()
