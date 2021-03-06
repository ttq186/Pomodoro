"""empty message

Revision ID: 5a29cd551543
Revises: d4b4bf8a2811
Create Date: 2021-12-21 09:16:43.324899

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5a29cd551543'
down_revision = 'd4b4bf8a2811'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('task', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('task', 'created_at')
    # ### end Alembic commands ###
