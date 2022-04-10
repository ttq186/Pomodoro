"""empty message

Revision ID: ba7f3b469486
Revises: aab2292d2d5f
Create Date: 2022-04-06 10:35:40.757144

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ba7f3b469486'
down_revision = 'aab2292d2d5f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('session', sa.Column('task_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'session', 'task', ['task_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'session', type_='foreignkey')
    op.drop_column('session', 'task_id')
    # ### end Alembic commands ###